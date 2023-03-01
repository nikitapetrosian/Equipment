import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import db from './database';

export function FormDialog() {
    const field = [
        { name: 'Название', id: 'name' },
        { name: 'Количество', id: 'count' },
        { name: 'Место расположение', id: 'place' }
    ]
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState({
        name: "",
        count: 1,
        place: "",
        id: ""
    });
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
        const newValue = event.target.value
        switch (id) {
            case 'name':
                setValue({
                    name: newValue,
                    count: value.count,
                    place: value.place,
                    id: value.id
                })
                break;
            case 'count':
                setValue({
                    name: value.name,
                    count: +newValue,
                    place: value.place,
                    id: value.id
                })
                break;
            case 'place':
                setValue({
                    name: value.name,
                    count: value.count,
                    place: newValue,
                    id: value.id
                })
                break;
            case 'id':
                setValue({
                    name: value.name,
                    count: value.count,
                    place: newValue,
                    id: value.name
                })
                break;
            default:
                console.log("Нет таких значений");
        }
    }
    // console.log(value);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const saveAndClose = () => {
        db.addEquipment(value).then(() => {
            console.info("Done");
        });
        setOpen(false);
    };

    return (
        <div >
            <Button sx={{ ml: 5 }} color="inherit" variant="outlined" onClick={handleClickOpen}>
                <AddCircleOutlineIcon />
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Добавление оборудования</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Внимательно заполните все поля
                    </DialogContentText>
                    {field.map((f) => (
                        <TextField
                            key={f.name}
                            autoFocus
                            margin="dense"
                            id={f.id}
                            label={f.name}
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={
                                (event:
                                    React.ChangeEvent<HTMLInputElement>) => handleChange(event, event.target.id)
                            }
                        />
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Отмена</Button>
                    <Button onClick={() => saveAndClose()}>Сохранить</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}