
// Simple animation utilities for crystal ball effects

/**
 * Creates a glowing effect with random opacity changes
 */
export function createGlowEffect(element: HTMLElement | null, duration: number = 3000): void {
  if (!element) return;
  
  const animate = () => {
    const baseOpacity = 0.3;
    const randomOpacity = baseOpacity + (Math.random() * 0.4); // Random opacity between 0.3 and 0.7
    
    element.style.opacity = randomOpacity.toString();
    
    // Random duration variation for more organic look
    const randomDuration = duration + (Math.random() * 1000 - 500);
    setTimeout(animate, randomDuration);
  };
  
  animate();
}

/**
 * Creates a mist swirling effect using random transforms
 */
export function createMistEffect(element: HTMLElement | null, duration: number = 5000): void {
  if (!element) return;
  
  const animate = () => {
    const randomRotate = Math.random() * 10 - 5; // Random rotation between -5 and 5 degrees
    const randomScaleX = 0.95 + (Math.random() * 0.1); // Random scale between 0.95 and 1.05
    const randomScaleY = 0.95 + (Math.random() * 0.1);
    
    element.style.transform = `rotate(${randomRotate}deg) scale(${randomScaleX}, ${randomScaleY})`;
    
    // Random duration variation
    const randomDuration = duration + (Math.random() * 2000 - 1000);
    setTimeout(animate, randomDuration);
  };
  
  animate();
}

/**
 * Creates a floating effect with subtle up and down movements
 */
export function createFloatingEffect(element: HTMLElement | null, amplitude: number = 5, duration: number = 4000): void {
  if (!element) return;
  
  let startY = 0;
  let direction = 1;
  let currentPosition = 0;
  
  const animate = () => {
    currentPosition += (0.1 * direction);
    
    if (Math.abs(currentPosition) > amplitude) {
      direction *= -1; // Reverse direction when reaching amplitude
    }
    
    element.style.transform = `translateY(${currentPosition}px)`;
    
    requestAnimationFrame(animate);
  };
  
  animate();
}
