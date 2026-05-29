import ClientSolutionPage from './ClientSolutionPage'

export default async function SolutionPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  return <ClientSolutionPage slug={params.slug} />
}
