import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import db from './helpers/database';
import { IbuildingAndRooms, Iequipment } from './helpers/model';
import { hierarchyBuildingAndRooms } from './helpers/hierarchyBuildingAndRooms';
import { equipments } from './helpers/equipment';
import ListTable from './table';
import { FormDialog } from './helpers/moda';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function App() {
  const [nameEquipment, setNameEquipment] = React.useState<string | []>('main')
  const handleClick = (name) => {
    setNameEquipment(name);
  };

  const [buildingAndRooms, setBuildingAndRooms] = React.useState<IbuildingAndRooms[] | string>('Все зданиия и комнаты');
  const [equipment, setEquipment] = React.useState<Iequipment[]>([])
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    db.getBuildingAndRooms().then((value: any) => {
      setBuildingAndRooms(value)
    })
    db.getEquipment().then((value: any) => {
      setEquipment(value)
    })
  }, [])
  const hierarchy = hierarchyBuildingAndRooms(buildingAndRooms)
  const equipmentList = equipments(equipment, nameEquipment)
  console.log(equipment);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography display='flex' variant="h6" noWrap component="div">
            {nameEquipment}
            <FormDialog />
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <div >
            {hierarchy.map((item) => (
              <Accordion key={item}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{item[0]}</Typography>
                </AccordionSummary >
                {item[1].map((e) => (
                  <AccordionDetails key={e} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  >
                    {typeof e != 'string' ?
                      e.map((r) => (
                        <Button sx={{
                          margin: 1,
                        }}
                          key={r} variant="contained"
                          onClick={() => handleClick(r)}
                        >{r}</Button>
                      )) :
                      <Button variant="contained"
                        onClick={() => handleClick(e)}
                      >{e}</Button>
                    }
                  </AccordionDetails>
                ))}
              </Accordion>
            ))}
          </div>
        </List>
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <ListTable data={equipmentList} />
      </Main>
    </Box>
  );
}

export default App;
