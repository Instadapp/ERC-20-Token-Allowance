# ERC-20-Token-Allowance

- Mainnet: [https://thegraph.com/hosted-service/subgraph/richa-iitr/erc20-allowance-fantom?selected=playground](https://thegraph.com/hosted-service/subgraph/richa-iitr/erc20-allowance-fantom?selected=playground)
- Matic: [https://thegraph.com/hosted-service/subgraph/richa-iitr/erc20-allowance-matic?selected=playground](https://thegraph.com/hosted-service/subgraph/richa-iitr/erc20-allowance-matic?selected=playground)
- Avalanche: [https://thegraph.com/hosted-service/subgraph/richa-iitr/erc20-allowance-avalanche?selected=playground](https://thegraph.com/hosted-service/subgraph/richa-iitr/erc20-allowance-avalanche?selected=playground)
- Arbitrum: [https://thegraph.com/hosted-service/subgraph/richa-iitr/erc20-allowance-arbitrum?selected=playground](https://thegraph.com/hosted-service/subgraph/richa-iitr/erc20-allowance-arbitrum?selected=playground)
- Fantom: [https://thegraph.com/hosted-service/subgraph/richa-iitr/erc20-allowance-fantom?selected=playground](https://thegraph.com/hosted-service/subgraph/richa-iitr/erc20-allowance-fantom?selected=playground)
- Optimism: [https://thegraph.com/hosted-service/subgraph/richa-iitr/erc20-allowance-optimism?selected=playground](https://thegraph.com/hosted-service/subgraph/richa-iitr/erc20-allowance-optimism?selected=playground)

Query:
<pre>
{
  accounts {
    id
    version
    accountID
    address
    creator
    transactionsCount
    approvals {
      id
      token {
        id
        name
        symbol
        decimals
      }
      from
      to
      value
    }
  }
}
</pre>
