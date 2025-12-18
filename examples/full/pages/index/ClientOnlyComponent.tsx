console.log('This will only run on the client side.')

export default function ClientOnlyComponent() {
  return (
    <div>
      <h2>Client Only Component</h2>
      <p>This component is rendered only on the client side.</p>
    </div>
  )
}
