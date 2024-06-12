import React from "react";
import "../styles/Footer.scss";
import { AlertDialog, Button, Flex, Inset, Table } from "@radix-ui/themes";

const Footer: React.FC = () => {
  return (
    <>
      <AlertDialog.Title>Delete Users</AlertDialog.Title>
      <AlertDialog.Description size="2">
        Are you sure you want to delete these users? This action is permanent
        and cannot be undone.
      </AlertDialog.Description>
      <Inset side="x" my="5">
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Group</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.RowHeaderCell>Danilo Sousa</Table.RowHeaderCell>
              <Table.Cell>danilo@example.com</Table.Cell>
              <Table.Cell>Developer</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.RowHeaderCell>Zahra Ambessa</Table.RowHeaderCell>
              <Table.Cell>zahra@example.com</Table.Cell>
              <Table.Cell>Admin</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Inset>
      <Flex gap="3" justify="end">
        <AlertDialog.Cancel>
          <Button variant="soft" color="gray">
            Cancel
          </Button>
        </AlertDialog.Cancel>
        <AlertDialog.Action>
          <Button color="red">Delete users</Button>
        </AlertDialog.Action>
      </Flex>
    </>
  );
};

export default Footer;
