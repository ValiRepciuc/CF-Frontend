import {
  Menu,
  IconButton,
  Box,
  Text,
  Badge,
  Button,
  VStack,
  Flex,
  Center,
} from "@chakra-ui/react";
import { IoMdNotificationsOutline } from "react-icons/io";
import {
  useNotification,
  useMarkNotificationAsRead,
} from "../../hooks/useNotification";

const NotificationDropDown = () => {
  const { notification, setNotification } = useNotification();
  const unreadCount = notification.filter((n) => !n.isRead).length;

  const { markAsRead, markAllAsRead } = useMarkNotificationAsRead();

  const handleSelect = async (notifId: string) => {
    await markAsRead(notifId);
    setNotification((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, isRead: true } : n))
    );
  };

  const handleMarkAll = async () => {
    await markAllAsRead();
    setNotification((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <IconButton
          aria-label="Deschide notificările"
          as={Box}
          position="relative"
          variant="ghost"
          _hover={{ bgColor: "#535bf2" }}
          size="lg"
        >
          <IoMdNotificationsOutline size="1.7em" />
          {unreadCount > 0 && (
            <Badge
              colorScheme="red"
              borderRadius="full"
              position="absolute"
              top="0"
              right="0"
              transform="translate(25%, -25%)"
              fontSize="0.65em"
              px={2}
            >
              {unreadCount}
            </Badge>
          )}
        </IconButton>
      </Menu.Trigger>

      <Menu.Positioner>
        <Menu.Content
          maxW="300px"
          p={3}
          borderRadius="md"
          boxShadow="lg"
          bgColor={"#646cff"}
        >
          <Flex justify="space-between" align="center" mb={2}>
            <Text fontSize="md" fontWeight="bold">
              Notificări
            </Text>
            {notification.length > 0 && (
              <Button
                onClick={handleMarkAll}
                size="xs"
                colorScheme="blue"
                variant="outline"
              >
                Mark all as read
              </Button>
            )}
          </Flex>

          {notification.length === 0 ? (
            <Center py={3}>
              <Text fontSize="sm" color="gray.500">
                Nicio notificare
              </Text>
            </Center>
          ) : (
            <VStack align="stretch" gap={2} maxH="300px" overflowY="auto">
              {notification.slice(0, 10).map((notif) => (
                <Box
                  key={notif.id}
                  p={3}
                  bg={notif.isRead ? "gray.100" : "#646cff"}
                  borderRadius="md"
                  _hover={{ bg: "blue.100" }}
                  cursor="pointer"
                  onClick={() => handleSelect(notif.id)}
                >
                  <Text fontSize="sm" color="gray.800">
                    {notif.message}
                  </Text>
                </Box>
              ))}
            </VStack>
          )}
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
};

export default NotificationDropDown;
