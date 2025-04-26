type Color = "red" | "green" | "blue";

type ButtonProps = {
  buttonText: string;
  textColor?: Color;
  fontSize: number;
  pillShape?: boolean;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isdisabled:boolean
};

const Button = (props: ButtonProps) => {
  return (
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded height-20 disabled:bg-gray-600"
        onClick={(event) => props.handleClick(event)} disabled={props.isdisabled} 
      >
        {props.buttonText}
      </button>
  );
};
export default Button;
