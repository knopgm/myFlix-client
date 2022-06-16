import React from "react";

export function UpdateUser() {
  return (
    <Form className="profile-form">
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => handleUpdate(e.target.value)}
          defaultValue={user.username}
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={"6"}
          placeholder="Your password must be 6 or more characters"
        />
        {passwordErr && <p>{passwordErr}</p>}
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email address"
        />
        {emailErr && <p>{emailErr}</p>}
      </Form.Group>

      <Form.Group controlId="formBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="birthday"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          placeholder="Enter your Birthday"
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleRegister}>
        Update
      </Button>
    </Form>
  );
}
