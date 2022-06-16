import React from "react";
import { Card, ListGroup } from "react-bootstrap";

export function UserInfo({ email, name }) {
  return (
    <Card>
      <ListGroup>
        <List.Item>User: {name}</List.Item>
        <List.Item>Email: {email}</List.Item>
      </ListGroup>
    </Card>
  );
}
