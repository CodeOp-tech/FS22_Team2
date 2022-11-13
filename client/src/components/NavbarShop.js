import {Button, Container, Navbar, Modal} from "react-bootstrap"
// NOTE: React-bootstrap installed to simplify designing Navbar
// Modal element is when you click on the cart, and it shows the screen on top of the webpage showing all different data related to cart

function NavbarShop() {


    return (
        <Navbar expand="sm"> {/* determines where the Navbar collapses for mobile screens etc*/}
        <Navbar.Brand href="/">Ecommerce Store</Navbar.Brand> {/* Direct to homepage */}
        <Navbar.Toggle /> {/* Allows us to have the element if in mobile screen, some things will collapse */}
        <Navbar.Collapse className="justify-content-end">
            <Button>Cart 0 Items</Button>

        </Navbar.Collapse>

        </Navbar>
    )
}

export default NavbarShop;