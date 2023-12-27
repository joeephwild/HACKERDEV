import { ApolloClient, InMemoryCache } from "@apollo/client";

export const PROVIDER = "https://rpc-testnet.viction.xyz";
export const artistNFTAddress = "0x162119d2237C60926D55DC1bA997025233CF7823";
export const filMediaMarketplaceAddress =
  "0x8AcB75D06955Df7DF91BDf3113a7062F6e83324a";
export const dynamicNftAddress = "0xb023d899938F8A45ba90A0a993D29fd516De10f6";
export const userNFTAddress = "0xb5Fe96F6AFc0817729571407E2dd342f7e3A6905";
export const nftAddress = "0xae912E61006a9D660929E8fD264EF6dC9577F258";

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri:
    process.env.NEXT_PUBLIC_SUBGRAPH_URL ||
    "https://api.studio.thegraph.com/query/42226/filmedia3/0.0.1",
});
