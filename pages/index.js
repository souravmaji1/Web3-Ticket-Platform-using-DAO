import { Box } from '@chakra-ui/react'
import {
  AppShell,
  Sidebar,
  SidebarSection,
  NavItem,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavGroup,
  SearchInput,
} from '@saas-ui/react'
import { FiHome, FiUsers, FiSettings,FiHelpCircle } from 'react-icons/fi'
import UploadPage from '../components/Chart';
import Charts from '../components/Bar';
import {
  Badge,
  Text,
} from '@chakra-ui/react'


export default function Page() {
  return (
    <AppShell
      variant="static"
      minH="$100vh"
      navbar={
        <Navbar borderBottomWidth="1px" position="sticky" top="0">
          <NavbarBrand>
           
          </NavbarBrand>
          <NavbarContent justifyContent="flex-end">
            <NavbarItem>
              <SearchInput size="sm" />
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      }
      sidebar={
        <Sidebar position="sticky" top="56px" toggleBreakpoint="sm">
          <SidebarSection>
         
          <NavGroup>
              <NavItem icon={<FiHome />} isActive>
                Home
              </NavItem>
              
              <NavItem href='/profile' icon={<FiUsers />}>Profile</NavItem>
              <NavItem href='/event'  icon={<FiSettings />}>Create</NavItem>
            </NavGroup>

            <NavGroup title="Teams" isCollapsible>
              <NavItem>Sales</NavItem>
              <NavItem>Support</NavItem>
            </NavGroup>

            <NavGroup title="Tags" isCollapsible>
              <NavItem
                icon={<Badge bg="purple.500" boxSize="2" borderRadius="full" />}
              >
                <Text>Lead</Text>
                <Badge opacity="0.6" borderRadius="full" bg="none" ms="auto">
                  83
                </Badge>
              </NavItem>
              <NavItem
                icon={<Badge bg="cyan.500" boxSize="2" borderRadius="full" />}
              >
                <Text>Customer</Text>
                <Badge opacity="0.6" borderRadius="full" bg="none" ms="auto">
                  210
                </Badge>
              </NavItem>
            </NavGroup>
          </SidebarSection>
          <SidebarSection flex="1" overflowY="auto"></SidebarSection>
          <SidebarSection>
            <NavItem icon={<FiHelpCircle />}>Documentation</NavItem>
         
          </SidebarSection>
        </Sidebar>
      }
    >
      <Box as="main" flex="1" py="2" px="4">
      <UploadPage />
      <Charts />
      </Box>
    </AppShell>
  )
}