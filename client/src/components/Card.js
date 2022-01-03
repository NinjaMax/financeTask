import React from 'react';
import { MDBCard, MDBCardBody, MDBCardText, MDBCardImage } from 'mdb-react-ui-kit';

export default function App() {
  return (
    <MDBCard style={{ width: '18rem' }}>
      <MDBCardImage src='https://mdbcdn.b-cdn.net/img/new/standard/nature/182.webp' alt='Sunset Over the Sea' position='top' />
      <MDBCardBody>
        <MDBCardText>
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
  );
}