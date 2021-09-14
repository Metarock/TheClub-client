// export const parameters = {
//   actions: { argTypesRegex: "^on[A-Z].*" },
//   controls: {
//     matchers: {
//       color: /(background|color)$/i,
//       date: /Date$/,
//     },
//   },
// }
import { addDecorator } from '@storybook/react'
import { MockedProvider } from '@apollo/client/testing'
import { ApolloProvider } from '@apollo/client'
import React from 'react'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import theme from '@chakra-ui/theme'
import client from '../src/utils/withApollo'

addDecorator(storyFn => (
  <ApolloProvider client={client}>
    <ChakraProvider theme={theme}>
      <CSSReset />
      {storyFn()}
    </ChakraProvider>
  </ApolloProvider>
))

