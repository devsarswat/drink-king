import React from 'react';
import { Dialog,  DialogContent, Typography, CardMedia } from '@mui/material';


const Popup = ({ variety, onClose }) => {
  return (
    <Dialog open={!!variety} onClose={onClose} maxWidth="md"classes={{ paper: 'popup-paper' }}>
    <CardMedia component="img"  image={variety?.image} alt={variety?.name} className="popup-image" />
      <DialogContent className='popup-box' >
      <Typography variant="h6" className='popup-heading'>{variety?.name}</Typography>
        <Typography variant="body2" className='popup-text'>{variety?.description}</Typography>
        <Typography variant="body2" className='popup-text'><span>Origin:</span> {variety?.origin}</Typography>
        <Typography variant="body2" className='popup-text'><span>Strength:</span>{variety?.strength}</Typography>
        <Typography variant="body2" className='popup-text-p'>₹  {variety?.price}</Typography>
      </DialogContent>
    </Dialog>
  );
};

export default Popup;
