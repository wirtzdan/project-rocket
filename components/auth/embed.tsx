"use client";

import { Box } from "@chakra-ui/react";

interface AuthProps {
  children?: React.ReactNode;
  popup?: boolean;
  uid?: string;
  [key: string]: unknown; // For any additional props
}

export const Login = ({ children, popup, ...props }: AuthProps) => {
  return (
    <Box
      {...(children ? { asChild: true } : {})}
      data-mode={popup ? "popup" : "embed"}
      data-o-auth="1"
      data-widget-mode="login"
      suppressHydrationWarning
      {...props}
    >
      {popup && children}
    </Box>
  );
};

export const SignUp = ({ children, popup, ...props }: AuthProps) => {
  return (
    <Box
      {...(children ? { asChild: true } : {})}
      data-mode={popup ? "popup" : "embed"}
      data-o-auth="1"
      data-widget-mode="register"
      suppressHydrationWarning
      {...props}
    >
      {popup && children}
    </Box>
  );
};

export const Profile = ({ children, popup, ...props }: AuthProps) => {
  return (
    <Box
      {...(children ? { asChild: true } : {})}
      data-mode={popup ? "popup" : "embed"}
      data-o-profile="1"
      suppressHydrationWarning
      {...props}
    >
      {popup && children}
    </Box>
  );
};

export const LeadCapture = ({ children, popup, uid, ...props }: AuthProps) => {
  return (
    <Box
      {...(children ? { asChild: true } : {})}
      data-form-uid={uid}
      data-mode={popup ? "popup" : "embed"}
      data-o-lead-capture="1"
      suppressHydrationWarning
      {...props}
    >
      {popup && children}
    </Box>
  );
};

export const EmailList = ({ children, popup, uid, ...props }: AuthProps) => {
  return (
    <Box
      {...(children ? { asChild: true } : {})}
      data-email-list-uid={uid}
      data-mode={popup ? "popup" : "embed"}
      data-o-email-list="1"
      suppressHydrationWarning
      {...props}
    >
      {popup ? children : null}
    </Box>
  );
};

export const Support = ({ children, popup, ...props }: AuthProps) => {
  return (
    <Box
      {...(children ? { asChild: true } : {})}
      data-mode={popup ? "popup" : "embed"}
      data-o-support="1"
      suppressHydrationWarning
      {...props}
    >
      {popup ? children : null}
    </Box>
  );
};

export const LogOut = ({ children, ...props }: AuthProps) => {
  return (
    <Box
      {...(children ? { asChild: true } : {})}
      data-o-logout-link="1"
      suppressHydrationWarning
      {...props}
    >
      {children}
    </Box>
  );
};
