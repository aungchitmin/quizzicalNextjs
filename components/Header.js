export default function Header(props) {
    return <div>
        <h1>this is a Header</h1>
        <main>{props.children}</main>
    </div>
}