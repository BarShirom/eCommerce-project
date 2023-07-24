import { useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface Props {}

const SearchBox = (props: Props) => {
  const [keyword, setKeyword] = useState<string>("");
  const navigate = useNavigate();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <Form onSubmit={submitHandler}>
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-5"
        data-testid="search-box"
      ></Form.Control>
    </Form>
  );
};

export default SearchBox;
