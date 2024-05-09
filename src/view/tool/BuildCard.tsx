import { Grid, GridItem, Flex, useColorModeValue } from '@chakra-ui/react';

import BuildForm from './components/BuildForm';
import BuildResult from './components/BuildResult';

const BuildCard = () => {
  const backgroundColor = useColorModeValue('blackAlpha.50', 'secondaryGray.900');

  return (
    <Grid
      mb="20px"
      gridTemplateColumns={{ xl: 'repeat(3, 1fr)' }}
      gap={{ base: '20px', xl: '20px' }}
      display={{ base: 'block', xl: 'grid' }}
    >
      <Flex flexDirection="column" gridArea={{ xl: '1 / 1 / 2 / 3', '2xl': '1 / 1 / 2 / 2' }}>
        <BuildForm />
      </Flex>
      <GridItem colSpan={2}>
        <Flex
          flexDirection="column"
          gridArea={{ xl: '1 / 3 / 2 / 4', '2xl': '1 / 2 / 2 / 3' }}
          p="20px"
          bg={backgroundColor}
          rounded="md"
        >
          <BuildResult />
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default BuildCard;
