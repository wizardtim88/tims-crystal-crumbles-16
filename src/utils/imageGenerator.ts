
import html2canvas from "html2canvas";

// Function to generate a shareable image from a DOM element
export const generateFortuneImage = async (element: HTMLElement): Promise<string> => {
  try {
    console.log("Starting image generation...");
    
    // Set the desired dimensions for Twitter (1200x675)
    const canvas = await html2canvas(element, {
      width: 1200,
      height: 675,
      scale: 1.5, // Reduced from 2 to improve performance
      backgroundColor: "#fef3c7", // Solid amber background instead of null
      logging: true, // Enable logging for debugging
      useCORS: true,
      allowTaint: true, // Allow cross-origin images
      foreignObjectRendering: false, // Disable foreign object rendering which can cause issues
      removeContainer: true,
      imageTimeout: 15000, // 15 second timeout
      onclone: (clonedDoc) => {
        console.log("Document cloned successfully");
        // Ensure fonts are loaded in the cloned document
        const clonedElement = clonedDoc.querySelector('[data-html2canvas-ignore]');
        if (clonedElement) {
          clonedElement.remove();
        }
      }
    });
    
    console.log("Canvas generated successfully:", canvas.width, "x", canvas.height);
    
    // Convert to PNG
    const dataUrl = canvas.toDataURL("image/png", 1.0);
    console.log("Image converted to data URL successfully");
    
    return dataUrl;
  } catch (error) {
    console.error("Detailed error generating fortune image:", error);
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack trace");
    throw new Error(`Failed to generate image: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Function to download the generated image
export const downloadImage = (dataUrl: string, filename: string): void => {
  try {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = filename;
    link.click();
    console.log("Download initiated successfully");
  } catch (error) {
    console.error("Error downloading image:", error);
    throw error;
  }
};

// Function to share to Twitter with image
export const shareToTwitter = (imageUrl: string, text: string): void => {
  try {
    console.log("Opening Twitter share dialog...");
    // Open Twitter intent URL in a new window
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
      "_blank",
      "width=550,height=420"
    );
  } catch (error) {
    console.error("Error sharing to Twitter:", error);
    throw error;
  }
};
