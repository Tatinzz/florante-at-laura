export const handleMagneticMove = (e: MouseEvent, element: HTMLElement) => {
  const { clientX, clientY } = e;
  const { left, top, width, height } = element.getBoundingClientRect();
  
  const middleX = left + width / 2;
  const middleY = top + height / 2;
  
  const offsetX = (clientX - middleX) * 0.1;
  const offsetY = (clientY - middleY) * 0.1;
  
  element.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
};

export const handleMagneticLeave = (element: HTMLElement) => {
  element.style.transform = 'translate(0, 0)';
};

export const initializeMagneticEffect = () => {
  const magneticElements = document.querySelectorAll('.magnetic-hover');
  
  magneticElements.forEach((element) => {
    const htmlElement = element as HTMLElement;
    
    const moveHandler = (e: Event) => handleMagneticMove(e as MouseEvent, htmlElement);
    const leaveHandler = () => handleMagneticLeave(htmlElement);
    
    element.addEventListener('mousemove', moveHandler);
    element.addEventListener('mouseleave', leaveHandler);
    
    return () => {
      element.removeEventListener('mousemove', moveHandler);
      element.removeEventListener('mouseleave', leaveHandler);
    };
  });
}; 