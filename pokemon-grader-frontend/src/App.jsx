import React from 'react';
import { HomePage } from './Components/HomePage';
import { CardPage } from './Components/CardPage';
import { ContactsPage } from './Components/ContactsPage';
import { GradingPage } from './Components/GradingPage';
import { NewContentPage } from './Components/NewContentPage';
import { PacksPage } from './Components/PacksPage';
import { PreorderPage } from './Components/PreorderPage';

function App() {
  return (
    <div>
      {/* Example usage: render one page at a time */}
      <HomePage />
      {/* <PacksPage /> */}
      {/* <CardPage /> */}
      {/* <PreorderPage /> */}
      {/* <GradingPage /> */}
      {/* <NewContentPage /> */}
      {/* <ContactsPage /> */}
    </div>
  );
}

export default App;
