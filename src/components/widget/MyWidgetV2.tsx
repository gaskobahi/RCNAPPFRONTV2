import "./mywidget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
const MyWidgetV2 = (props:any) => {
  let {type,value,isSymbol,myIcon}=props

  const styles = {
    largeIcon: {
      width: 40,
      height: 40,
    },
  }
  
  let data:any = {
    title: type,
    value:value,
    isSymbol: isSymbol?isSymbol:"",
    link:"",
    icon:myIcon?myIcon:""
  }
  //temporary

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title.toUpperCase()}</span>
        <span className="counter">
           {value} <sup>{data.isSymbol}</sup>
        </span>
        <span className="linkV2">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
           {data.icon}
        </div>
      </div>
    </div>
  );
};

export default MyWidgetV2;
