import SignUp from "./signUp/SignUp"
import Profile from "./profile/Profile"
import Contact from "./contacts/Contact"
import AddContact from "./contacts/AddContact"
import BlockedContact from "./contacts/BlockedContact"
import ContactDetails from "./contacts/ContactDetails"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<SignUp/>} />
      <Route path="/update-profile" element = {<Profile/>} />
      <Route path="/contact" element = {<Contact/>} />
      <Route path="/add-contact" element = {<AddContact/>} />
      <Route path="/blocked-contacts" element = {<BlockedContact/>} />
      <Route path="/contact-details/:contactId" element={<ContactDetails />} />

    </Routes>
   </Router>
  )
}

export default App
