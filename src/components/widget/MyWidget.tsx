import "./mywidget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AccessibleIcon from '@mui/icons-material/Accessible';
import { Link } from 'react-router-dom';

const MyWidget = (props:any) => {
  let {type,value,isSymbol}=props
  let data:any;
  
  //temporary
  const diff:number = 20;
  const styles = {
    largeIcon: {
      width: 40,
      height: 40,
    },
  }

    
  

    switch (type) {
      case "Procurements":
        data = {
          title: type,
          value:value,
          isSymbol: isSymbol?isSymbol:"",
          link: "See all "+type,
          icon: (
            <ShoppingBasketIcon
              className="icon"
              style={{
                height: styles.largeIcon.height,
                 width: styles.largeIcon.width,
                color: "crimson",
                backgroundColor: "rgba(255, 0, 0, 0.2)",
              }}
            />
          ),
        }
    break;
    case "Suppliers":
        data = {
          title: type,
          value:value,
          isSymbol: isSymbol,
          link: "See all "+type,
          icon: (
            <AccessibleIcon
              className="icon"
              style={{
                height: styles.largeIcon.height,
                 width: styles.largeIcon.width,
                color: "crimson",
                backgroundColor: "rgba(255, 0, 0, 0.2)",
              }}
            />
          ),
        }
    break;
    default:
    break;
    }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title.toUpperCase()}</span>
        <span className="counter">
          {data.isSymbol && data.isSymbol} {data.value}
        </span>
        <span className="link"><Link to={"/"+data.title} >{data?.link}</Link></span>
      </div>
      <div className="right">
           {data.icon}
      </div>
    </div>
  );
};


export default MyWidget;
