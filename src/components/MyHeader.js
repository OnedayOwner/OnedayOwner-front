const MyHeader = ({headText,notice,Myinformation}) => {
    return( 
        <header>
        <div className="head_text">
            {headText}
        </div>
        <div className="header-icons">
            <div className="notice">
                {notice}
            </div>
            <div className="Myinformation">
                {Myinformation}
            </div>
        </div>
    </header>
    );
}
    export default MyHeader;