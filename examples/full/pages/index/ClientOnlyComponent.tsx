// TODO/ai change it to https://github.com/vikejs/vike-react/blob/8224b4dbf34e6d7c718243ef24063056f3e59a29/examples/full/components/ClientOnlyComponent.tsx#L3 and update test

console.log('This will only run on the client side.')

export default function ClientOnlyComponent() {
  return (
    <div>
      <h2>Client Only Component</h2>
      <p>This component is rendered only on the client side.</p>
    </div>
  )
}
