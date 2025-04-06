"use client"

import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  
  // Only show theme UI after mounting to avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])
  
  // Function to cycle through themes: light -> dark -> system -> light
  const cycleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  // Use a placeholder icon during SSR to avoid hydration mismatch
  if (!mounted) {
    return (
      <Button 
        variant="ghost" 
        size="sm" 
        className="h-8 w-8 px-0"
      >
        <Monitor className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Theme</span>
      </Button>
    )
  }

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      className="h-8 w-8 px-0" 
      onClick={cycleTheme}
    >
      {theme === 'light' && <Sun className="h-[1.2rem] w-[1.2rem]" />}
      {theme === 'dark' && <Moon className="h-[1.2rem] w-[1.2rem]" />}
      {(theme === 'system' || !theme) && <Monitor className="h-[1.2rem] w-[1.2rem]" />}
      <span className="sr-only">
        {theme === 'light' ? 'Switch to dark mode' : 
         theme === 'dark' ? 'Switch to system mode' : 'Switch to light mode'}
      </span>
    </Button>
  )
}
