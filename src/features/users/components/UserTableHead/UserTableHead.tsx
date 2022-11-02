import React from "react";

type Props = {};

const UserTableHead = (props: Props) => {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Password</th>
        <th></th>
      </tr>
    </thead>
  );
};

export default UserTableHead;
