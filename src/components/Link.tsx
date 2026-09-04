import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';
import { Link as GLink } from 'gatsby';
import * as React from 'react';

const Link = React.forwardRef<HTMLAnchorElement, MuiLinkProps>(
    function Link(props, ref) {
        return <MuiLink component={GLink} ref={ref} {...props} />;
    }
);

export default Link;