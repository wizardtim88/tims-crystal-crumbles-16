
import html2canvas from "html2canvas";

export type ImageTemplateType = "tarot" | "zodiac" | "fortune";

// Function to generate a shareable image from a DOM element with enhanced settings
export const generateComprehensiveImage = async (element: HTMLElement, type: ImageTemplateType): Promise<string> => {
  try {
    console.log(`Starting ${type} image generation...`);
    
    // Enhanced settings based on template type
    const getBackgroundColor = () => {
      switch (type) {
        case "tarot": return "#f3e8ff"; // Light purple
        case "zodiac": return "#e0e7ff"; // Light indigo
        case "fortune": return "#fef3c7"; // Light amber
        default: return "#fef3c7";
      }
    };

    // Wait for images to load before capturing
    const images = element.querySelectorAll('img');
    await Promise.all(Array.from(images).map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        // Set timeout for image loading
        setTimeout(reject, 10000);
      });
    }));

    const canvas = await html2canvas(element, {
      width: 1200,
      height: 675,
      scale: 1.5,
      backgroundColor: getBackgroundColor(),
      logging: true,
      useCORS: true,
      allowTaint: true,
      foreignObjectRendering: false,
      removeContainer: true,
      imageTimeout: 20000, // Increased timeout for complex images
      onclone: (clonedDoc) => {
        console.log("Document cloned successfully");
        // Remove any elements that shouldn't be captured
        const elementsToHide = clonedDoc.querySelectorAll('[data-html2canvas-ignore]');
        elementsToHide.forEach(el => el.remove());
        
        // Ensure all fonts are loaded
        const links = clonedDoc.querySelectorAll('link[rel="stylesheet"]') as NodeListOf<HTMLLinkElement>;
        links.forEach(link => {
          if (!link.href.includes('fonts.googleapis.com')) return;
          const newLink = clonedDoc.createElement('link');
          newLink.rel = 'stylesheet';
          newLink.href = link.href;
          clonedDoc.head.appendChild(newLink);
        });
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
    throw new Error(`Failed to generate ${type} image: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Legacy function for backward compatibility
export const generateFortuneImage = async (element: HTMLElement): Promise<string> => {
  return generateComprehensiveImage(element, "fortune");
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
