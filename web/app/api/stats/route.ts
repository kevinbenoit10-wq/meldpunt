import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const [
    { count: totaal },
    { count: opgelost },
    { count: behandeld },
  ] = await Promise.all([
    supabase.from('meldingen').select('*', { count: 'exact', head: true }),
    supabase.from('meldingen').select('*', { count: 'exact', head: true }).eq('status', 'opgelost'),
    supabase.from('meldingen').select('*', { count: 'exact', head: true }).neq('status', 'nieuw'),
  ])

  const responsRate = totaal && totaal > 0
    ? Math.round(((behandeld ?? 0) / totaal) * 100)
    : 0

  return NextResponse.json({ totaal, opgelost, responsRate })
}
