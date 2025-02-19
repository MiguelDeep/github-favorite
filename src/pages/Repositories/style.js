import styled from "styled-components"

export const Loading = styled.div`
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`

export const Container = styled.div`
    max-width: 700px;
    background-color: #FFF;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    padding: 30px;
    margin: 80px auto;

`

export const Owner = styled.header`

    display: flex;
    flex-direction: column;
    align-items: center;

img{
    width: 150px;
    border-radius:20%;
    margin: 20px 0;
}
p{
    margin-top:5px ;
    font-size: 14px;
    color: #000;
    text-align: center;
    line-height: 1.4;
    max-width: 400px;
}
h1{
    font-size:30px ;
    color: #0D2636;
};
`;
export const IssuesList = styled.li`
    margin-top: 30px;
    padding-top: 30px;
    border-top:1px solid #eee ;
    list-style: none;

  li{
    display: flex;
    padding: 15px 10px;
       
    & + li{
    margin-top: 12px;
    }
  img{
    width: 36px;
    height: 36px;
    border-radius:50% ;
    border:2px solid #0D2636;
    }

    div{
    flex: 1;
    margin-left: 12px;
      p{
    margin-top:10px ;
    font-size: 12px ;
    color: #000;
      }
    }
  strong{
    font-size:15px;

      a{
        text-decoration: none;
        color:#222;
        transition: 0.3s;
        &:hover{
          color:#0071DB;
        }
      }
      span{
        background-color: #222;
        color :#fff;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
        padding: 4px 7px;
        margin-left: 10px;
      }
    }
  }

`;

export const PageActions = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    button{
      background: none;
      border: none;
      cursor: pointer;

      &:disabled{
        cursor: not-allowed;
        opacity: 0.5;
      }
    }
`;


export const ButtonsFilterState = styled.div`
margin: 15px 0;
button{
  outline: 0;
  border: none;
  padding: 8px;
  border-radius:4px ;
  margin:0 3px ;

  &:nth-child(${props => props.active + 1}){
    background: #0071db;
    color:#fff;
  }
}
`