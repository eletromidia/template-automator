export const pickerOpts = {
  types: [
    {
      description: "Video",
      accept: {
        "video/*": [".mp4", ".webm", ".ogg",],
      },
    },
  ],
  excludeAcceptAllOption: true,
  multiple: false,
}

