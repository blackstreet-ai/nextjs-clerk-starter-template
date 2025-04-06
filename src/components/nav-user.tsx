"use client"

import {
  IconCreditCard,
  IconDotsVertical,
  IconNotification,
  IconUserCircle,
  IconLogin,
  IconUserPlus,
  IconLogout,
} from "@tabler/icons-react"
import { UserButton, SignInButton, SignUpButton, useAuth, useClerk, useUser } from "@clerk/nextjs"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function NavUser({
  user,
}: {
  user?: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()
  const { userId } = useAuth()
  const { signOut } = useClerk()
  const { user: clerkUser, isLoaded: isUserLoaded } = useUser()
  const isSignedIn = !!userId
  
  // Try different ways to get the email address
  const displayEmail = isUserLoaded && clerkUser ? (
    // First try to get the primary email
    clerkUser.primaryEmailAddress?.emailAddress ||
    // Then try the first email in the list
    clerkUser.emailAddresses?.[0]?.emailAddress ||
    // Finally fall back to the mock data or empty string
    user?.email || ''
  ) : (
    // If clerk user is not loaded, use mock data
    user?.email || ''
  )
  
  // For debugging
  console.log('User ID:', userId)
  console.log('Is user loaded:', isUserLoaded)
  console.log('Clerk user:', clerkUser)
  console.log('Display email:', displayEmail)

  return (
    <SidebarMenu>
      {!isSignedIn ? (
        <>
          <SidebarMenuItem>
            <SignInButton mode="modal">
              <SidebarMenuButton size="lg">
                <IconLogin className="size-4" />
                <span>Sign In</span>
              </SidebarMenuButton>
            </SignInButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SignUpButton mode="modal">
              <SidebarMenuButton size="lg">
                <IconUserPlus className="size-4" />
                <span>Sign Up</span>
              </SidebarMenuButton>
            </SignUpButton>
          </SidebarMenuItem>
        </>
      ) : (
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                {isUserLoaded && clerkUser ? (
                  <Avatar className="h-8 w-8 rounded-lg">
                    {clerkUser.imageUrl ? (
                      <AvatarImage src={clerkUser.imageUrl} alt={clerkUser.fullName || 'User'} />
                    ) : (
                      <AvatarFallback className="rounded-lg">
                        {clerkUser.firstName?.[0]}{clerkUser.lastName?.[0] || ''}
                      </AvatarFallback>
                    )}
                  </Avatar>
                ) : (
                  <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "h-8 w-8 rounded-lg",
                        userButtonTrigger: "p-0 h-8 w-8"
                      }
                    }}
                  />
                )}
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{clerkUser?.fullName || clerkUser?.username || user?.name || 'User'}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {displayEmail}
                  </span>
                </div>
                <IconDotsVertical className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    {isUserLoaded && clerkUser?.imageUrl ? (
                      <AvatarImage src={clerkUser.imageUrl} alt={clerkUser.fullName || 'User'} />
                    ) : user?.avatar ? (
                      <AvatarImage src={user.avatar} alt={user?.name || 'User'} />
                    ) : (
                      <AvatarFallback className="rounded-lg">
                        {isUserLoaded && clerkUser ? (
                          <>{clerkUser.firstName?.[0]}{clerkUser.lastName?.[0] || ''}</>
                        ) : (
                          'U'
                        )}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{clerkUser?.fullName || clerkUser?.username || user?.name || 'User'}</span>
                    <span className="text-muted-foreground truncate text-xs">
                      {displayEmail}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <IconUserCircle className="mr-2 size-4" />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconCreditCard className="mr-2 size-4" />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconNotification className="mr-2 size-4" />
                  Notifications
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                <IconLogout className="mr-2 size-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      )}
    </SidebarMenu>
  )
}
