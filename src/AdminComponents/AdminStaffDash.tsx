import React from 'react';
import { Box, Button, Grid, Modal, Paper, Typography } from '@mui/material';
import { getFullStaff, setAdmin } from '../utils/staffRequests';
import { Staff } from '../utils/types';
import { theme } from '../index';
import { useAppSelector } from '../Redux/hooks';
import { selectAuth } from '../Redux/authSlice';

function AdminStaffDash() {

  const styles = {
    paper: {
      padding: 1,
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
    },
    button: {
      width: '100%',
      textTransform: 'none',
    },
    modal: {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      maxWidth: 300,
      transform: 'translate(-50%, -50%)',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
      textAlign: 'center',
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column',
    },
  }

  const authState = useAppSelector(selectAuth)

  const [staffList, setStaffList] = React.useState<Staff[] | undefined>(undefined)
  const [modalOpen, setModalOpen] = React.useState(false)
  const [currStaff, setCurrStaff] = React.useState<Staff | undefined>(undefined)

  React.useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    getFullStaff().then((data) => {
      if(data) setStaffList(data.sort((a: Staff, b: Staff) => (b.isAdmin ? 1 : 0) - (a.isAdmin ? 1 : 0)))
    })
  }

  const handleModalOpen = (staff: Staff) => {
    setCurrStaff(staff)
    setModalOpen(true)
  }

  const handleModalClose = () => {
    setModalOpen(false)
    setCurrStaff(undefined)
  }

  const submitEdit = () => {
    if(currStaff) {
      setAdmin(currStaff.staffId, !currStaff.isAdmin).then(() => getData())
    }
    handleModalClose()
  }

  return (
    <Box sx={{width: '100%', maxHeight: '69vh', overflow: 'auto'}}>
      {
        staffList && staffList.map((staff) => {
          return (
            <Button sx={styles.button} onClick={() => handleModalOpen(staff)} key={staff.staffId}>
              <Paper sx={{...styles.paper, backgroundColor: staff.isAdmin ? theme.palette.error.dark : theme.palette.primary.main}}>
                <Grid container>
                  <Grid item xs={6}>
                    <Box sx={{textAlign: 'start'}}>
                      {staff.name}
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{textAlign: 'end'}}>
                      {staff.isAdmin ? 'Admin' : 'Staff'}
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Button>
          )
        })
      }
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
      >
        <Box sx={styles.modal}>
          <Typography variant={'h6'} sx={{marginBottom: 1}}>
            Editing "{currStaff && currStaff.name}"
          </Typography>
          <Typography sx={{marginBottom: 1}}>
            Administrators can change others staffs admin status, add, edit and delete items and view order statistics.
          </Typography>
          {
            (!currStaff || (authState.staffId === currStaff.staffId)) &&
              <Typography sx={{marginBottom: 1}} color={theme.palette.error.main}>
                  You cannot change your own status.
              </Typography>
          }
          <Button variant={'contained'} disabled={!currStaff || (authState.staffId === currStaff.staffId)} onClick={() => submitEdit()}>
            {currStaff && currStaff.isAdmin ? 'Revoke admin' : 'Garant admin'}
          </Button>
        </Box>
      </Modal>
    </Box>
  )
}

export default AdminStaffDash;
