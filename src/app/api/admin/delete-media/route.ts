import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient, createAdminSupabaseClient } from '@/lib/supabaseServer';

export async function DELETE(req: NextRequest) {
  try {
    // 1. Verify the caller is a logged-in user
    const serverClient = await createServerSupabaseClient();
    const { data: { user }, error: authError } = await serverClient.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Parse request body
    const { id, url, sourceTable } = await req.json() as {
      id: string;
      url?: string;
      sourceTable: 'media' | 'services' | 'music' | 'reviews';
    };

    if (!id || !sourceTable) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const allowedTables = ['media', 'services', 'music', 'reviews'] as const;
    if (!allowedTables.includes(sourceTable)) {
      return NextResponse.json({ error: 'Invalid table' }, { status: 400 });
    }

    // 3. Use the admin client (bypasses RLS) to delete the DB record
    const admin = createAdminSupabaseClient();
    const { error: dbError } = await admin.from(sourceTable).delete().eq('id', id);

    if (dbError) {
      console.error('DB delete error:', dbError);
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    // 4. Delete from Storage if it's a direct Supabase upload
    if (url && url.includes('supabase.co')) {
      try {
        const urlObj = new URL(url);
        const pathParts = urlObj.pathname.split('/object/public/');
        if (pathParts.length > 1) {
          const fullPath = pathParts[1];
          const bucket = fullPath.split('/')[0];
          const filePath = fullPath.substring(bucket.length + 1);
          await admin.storage.from(bucket).remove([filePath]);
        }
      } catch (e) {
        // Non-fatal — DB row is already deleted
        console.warn('Storage delete warning:', e);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Delete API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
