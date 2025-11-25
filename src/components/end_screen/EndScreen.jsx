import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Box, Typography } from '@mui/material';

const EndScreen = ({ scores }) => {

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Score Progression
      </Typography>

      {scores.length === 0 ? (
        <Typography>No scores yet.</Typography>
      ) : (
        <LineChart
          series={[
            {
              data: scores,
            },
          ]}
          height={300}
          width={600}
        />
      )}

      <Typography variant="body2" sx={{ mt: 2 }}>
        Total Scores: {scores.length}
      </Typography>
    </Box>
  );
};

export default EndScreen;
