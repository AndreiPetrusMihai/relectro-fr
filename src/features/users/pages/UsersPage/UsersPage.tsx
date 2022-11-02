import UserTable from "../../components/UserTable/UserTable";
import { Text, Box, Button } from "@mantine/core";
import { useGetUsersQuery } from "../../slice";
import { useState } from "react";
import { User } from "../../model/User";
import UserModal from "../../components/UserModal/UserModal";
import TopSection from "../../../../common/components/TopSection/TopSection";
import PageContent from "../../../../common/components/PageContent/PageContent";

const UsersPage = () => {
  const { data } = useGetUsersQuery();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const onAddClick = () => {
    setSelectedUser(null);
    setModalOpen(true);
  };

  const onUserClick = (user: User) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const onClose = () => {
    setModalOpen(false);
  };

  return (
    <PageContent>
      <TopSection>
        <Text size={20}>Users</Text>
        <Button onClick={onAddClick}>Add User</Button>
      </TopSection>

      <Box mt={15} />

      <UserTable users={data ?? []} onUserClick={onUserClick} />

      <UserModal
        open={modalOpen}
        selectedUser={selectedUser}
        onClose={onClose}
      />
    </PageContent>
  );
};

export default UsersPage;
