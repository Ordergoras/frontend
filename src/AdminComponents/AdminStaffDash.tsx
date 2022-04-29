import React from 'react';
import {Box, Typography} from '@mui/material';
import { getFullStaff } from '../utils/staffRequests';
import { Staff } from '../utils/types';

function AdminStaffDash() {

  const [staffList, setStaffList] = React.useState<Staff[] | undefined>(undefined)

  React.useEffect(() => {
    getFullStaff().then((data) => {
      if(data) setStaffList(data)
    })
  }, [])

  return (
    <Box>
      <Typography>
        {staffList ? staffList.toString() : 'Could not load'}
      </Typography>
    </Box>
  )
}

export default AdminStaffDash;
