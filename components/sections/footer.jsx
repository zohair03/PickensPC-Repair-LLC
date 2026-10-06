import React from 'react'
import FooterForm from './footerFormSection';
import FooterLinks from './footerLinksSection';
import MapSection from '../ui/googleMaps';

const Footer = () => {
  return (
    
      <footer>
        <FooterForm/>
        <MapSection/>
        <FooterLinks/>
      </footer>
    
  )
}

export default Footer
