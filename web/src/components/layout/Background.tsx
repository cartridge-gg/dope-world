import { Box } from "@chakra-ui/react";
import { colors } from "../../theme/colors";

export const Background = () => {
  return (
    <Box
      zIndex={0}
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
       opacity={0.25}
      pointerEvents="none"
      overflow="hidden"
    >
      <svg className="relative" width="100%" height="100%">
        <defs>
          <pattern id="dotted_bg" patternUnits="userSpaceOnUse" width="36" height="36">
            <svg width="2" height="2" viewBox="0 0 2 2" fill={colors.bg.dots} xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.5">
                <circle cx="1" cy="1" r="1" ></circle>
              </g>
            </svg>
          </pattern>

          <linearGradient id="grad_bot" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fff" stopOpacity={1} />
            <stop offset="100%" stopColor="#333" stopOpacity={1} />
          </linearGradient>

          <linearGradient id="grad_top" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#fff" stopOpacity={1} />
            <stop offset="100%" stopColor="#333" stopOpacity={1} />
          </linearGradient>

          <linearGradient id="grad_right" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fff" stopOpacity={1} />
            <stop offset="100%" stopColor="#333" stopOpacity={1} />
          </linearGradient>

          <linearGradient id="grad_left" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#fff" stopOpacity={1} />
            <stop offset="100%" stopColor="#333" stopOpacity={1} />
          </linearGradient>

          <mask id="gradients_mask">
            <rect width="100%" height="100%" fill="#fff" x="0" y="0"></rect>
            <rect width="calc(100% - 200px)" height="100px" fill="url(#grad_top)" x="100px" y="0"></rect>
            <rect
              width="calc(100% - 200px)"
              height="100px"
              fill="url(#grad_bot)"
              x="100px"
              y="calc(100% - 100px)"
            ></rect>
            <rect width="100px" height="calc(100% - 200px)" fill="url(#grad_left)" x="0" y="100px"></rect>
            <rect
              width="100px"
              height="calc(100% - 200px)"
              fill="url(#grad_right)"
              x="calc(100% - 100px)"
              y="100px"
            ></rect>
            *<rect width="100px" height="100px" fill="#333" x="0" y="0"></rect>
            <rect width="100px" height="100px" fill="#333" x="calc(100% - 100px)" y="0"></rect>
            <rect width="100px" height="100px" fill="#333" x="0" y="calc(100% - 100px)"></rect>
            <rect width="100px" height="100px" fill="#333" x="calc(100% - 100px)" y="calc(100% - 100px)"></rect>
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotted_bg)" mask="url(#gradients_mask)"></rect>
      </svg>
    </Box>
  );
};
