import { Box, Button, Typography } from '@mui/material';

import { useTheme } from '@emotion/react';
import { tokens } from '../../../theme';
import { mockDataMonitor } from './DataMonitor';
import CustomTable from './CustomTable';

const MonitorPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Modal

  return (
    <>
      <Box
        bgcolor={colors.primary[700]}
        margin={1}
        marginTop={5}
        borderRadius={3}
        height="76vh"
        display="flex"
        flexDirection="column"
      >
        {/* <Box
          padding={1.2}
          paddingLeft={4}
          paddingRight={4}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
          flex={1}
        ></Box> */}
        {/* <Box
          bgcolor={colors.bgTable}
          borderRadius={7}
          padding={1.5}
          paddingTop={2}
          paddingBottom={0}
          height="62vh"
          flex={15}
        ></Box> */}
        <CustomTable data={mockDataMonitor} />
      </Box>
    </>
  );
};
export default MonitorPage;
