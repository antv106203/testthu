import { Link } from "react-router-dom";
import { Button, Result } from "antd";
const ResultPage = () =>{
    return(
            <>
                <Result
                    title="Bạn cần đăng nhập"
                    extra={
                    <Button type="primary" key="console" >
                        <Link to="/login">
                            Đăng nhập
                        </Link>
                    </Button>
                    }
                />
            </>
    )
}

export default ResultPage