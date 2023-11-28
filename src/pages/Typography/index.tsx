import React from 'react';
import { Typography as MuiTypography } from '@mui/material';

const Typography = () => (
  <div>
    <MuiTypography variant="h1">Heading h1</MuiTypography>
    <MuiTypography variant="h2">Heading h2</MuiTypography>
    <MuiTypography variant="h3">Heading h3</MuiTypography>
    <MuiTypography variant="h4">Heading h4</MuiTypography>
    <MuiTypography variant="h5">Heading h5</MuiTypography>
    <MuiTypography variant="h6">Heading h6</MuiTypography>
    <hr />
    <MuiTypography variant="body1">
      <strong>[body1]:</strong> Lorem ipsum dolor sit amet, consectetur
      adipisicing elit. Asperiores corporis deleniti expedita fuga laudantium
      mollitia natus neque nihil nulla omnis perferendis possimus quas quasi,
      quis, ratione sed, tempora voluptas voluptates!
    </MuiTypography>
    <MuiTypography variant="body2">
      <strong>[body2]:</strong> Lorem ipsum dolor sit amet, consectetur
      adipisicing elit. Asperiores corporis deleniti expedita fuga laudantium
      mollitia natus neque nihil nulla omnis perferendis possimus quas quasi,
      quis, ratione sed, tempora voluptas voluptates!
    </MuiTypography>
    <hr />
    <MuiTypography variant="subtitle1">
      <strong>[subtitle1]:</strong> Lorem ipsum dolor sit amet, consectetur
      adipisicing elit. Asperiores corporis deleniti expedita fuga laudantium
      mollitia natus neque nihil nulla omnis perferendis possimus quas quasi,
      quis, ratione sed, tempora voluptas voluptates!
    </MuiTypography>
    <MuiTypography variant="subtitle2">
      <strong>[subtitle2]:</strong> Lorem ipsum dolor sit amet, consectetur
      adipisicing elit. Asperiores corporis deleniti expedita fuga laudantium
      mollitia natus neque nihil nulla omnis perferendis possimus quas quasi,
      quis, ratione sed, tempora voluptas voluptates!
    </MuiTypography>
    <hr />
    <MuiTypography variant="caption">
      <strong>[caption]:</strong> Lorem ipsum dolor sit amet, consectetur
      adipisicing elit. Asperiores corporis deleniti expedita fuga laudantium
      mollitia natus neque nihil nulla omnis perferendis possimus quas quasi,
      quis, ratione sed, tempora voluptas voluptates!
    </MuiTypography>
    <hr />
    <MuiTypography>
      <strong>[default]:</strong> Lorem ipsum dolor sit amet, consectetur
      adipisicing elit. Asperiores corporis deleniti expedita fuga laudantium
      mollitia natus neque nihil nulla omnis perferendis possimus quas quasi,
      quis, ratione sed, tempora voluptas voluptates!
    </MuiTypography>
  </div>
);

export default Typography;
