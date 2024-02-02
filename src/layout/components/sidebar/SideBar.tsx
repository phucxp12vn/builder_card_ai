import { Box, useColorModeValue } from '@chakra-ui/react';

import Content from './components/Content';

const SideBar = (props: { routes: RoutesType[] }) => {
  const { routes } = props;

  const variantChange = '0.2s linear';
  const shadow = useColorModeValue('14px 17px 40px 4px rgba(112, 144, 176, 0.08)', 'unset');
  // Chakra Color Mode
  const sidebarBg = useColorModeValue('white', 'navy.800');
  const sidebarMargins = '0px';

  return (
    <Box display={{ sm: 'none', xl: 'block' }} position="fixed" minH="100%">
      <Box
        bg={sidebarBg}
        transition={variantChange}
        w="300px"
        h="100vh"
        m={sidebarMargins}
        minH="100%"
        overflowX="hidden"
        boxShadow={shadow}
      >
        <Content routes={routes} />
      </Box>
    </Box>
  );
};

export default SideBar;
