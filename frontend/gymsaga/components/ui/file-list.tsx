"use client"

import * as React from "react"
import { FileText } from "lucide-react"
import prettyBytes from "pretty-bytes"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export const FileList = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("grid gap-4", className)} {...props} />
))
FileList.displayName = "FileList"

export const FileListItem = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "grid gap-4 rounded-xl border bg-card p-4 text-card-foreground shadow",
      className
    )}
    {...props}
  />
))
FileListItem.displayName = "FileListItem"

export const FileListHeader = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-4", className)}
    {...props}
  />
))
FileListHeader.displayName = "FileListHeader"

export const FileListIcon = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex size-10 items-center justify-center rounded-lg border bg-muted text-muted-foreground [&>svg]:size-5",
      className
    )}
    {...props}
  >
    {children ?? <FileText />}
  </div>
))
FileListIcon.displayName = "FileListIcon"

export const FileListInfo = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("grid flex-1 gap-1", className)} {...props} />
))
FileListInfo.displayName = "FileListInfo"

export const FileListName = React.forwardRef<
  React.ElementRef<"p">,
  React.ComponentPropsWithoutRef<"p">
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
FileListName.displayName = "FileListName"

export const FileListDescription = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center gap-2 text-xs text-muted-foreground",
      className
    )}
    {...props}
  />
))
FileListDescription.displayName = "FileListDescription"

export const FileListDescriptionSeparator = React.forwardRef<
  React.ElementRef<"span">,
  React.ComponentPropsWithoutRef<"span">
>(({ children, ...props }, ref) => (
  <span ref={ref} {...props}>
    {children ?? "•"}
  </span>
))
FileListDescriptionSeparator.displayName = "FileListDescriptionSeparator"

export interface FileListSizeProps
  extends React.ComponentPropsWithoutRef<"span"> {
  children: number
}

export const FileListSize = React.forwardRef<
  React.ElementRef<"span">,
  FileListSizeProps
>(({ children, ...props }, ref) => (
  <span ref={ref} {...props}>
    {prettyBytes(children)}
  </span>
))
FileListSize.displayName = "FileListSize"

export const FileListProgress = React.forwardRef<
  React.ElementRef<typeof Progress>,
  React.ComponentPropsWithoutRef<typeof Progress>
>(({ className, ...props }, ref) => (
  <Progress ref={ref} className={cn("h-1", className)} {...props} />
))
FileListProgress.displayName = "FileListProgress"

export const FileListDescriptionText = React.forwardRef<
  React.ElementRef<"span">,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn("flex items-center gap-1.5 [&>svg]:size-3", className)}
    {...props}
  />
))
FileListDescriptionText.displayName = "FileListDescriptionText"

export const FileListContent = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>((props, ref) => <div ref={ref} {...props} />)
FileListContent.displayName = "FileListContent"

export const FileListActions = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2", className)}
    {...props}
  />
))
FileListActions.displayName = "FileListActions"

export const FileListAction = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => (
  <Button
    ref={ref}
    variant={variant}
    size={size}
    className={cn("size-7 [&_svg]:size-3.5", className)}
    {...props}
  />
))
FileListAction.displayName = "FileListAction"
