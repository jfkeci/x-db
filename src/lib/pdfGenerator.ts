import { jsPDF } from 'jspdf';

export interface ExerciseData {
  id: string;
  name: string;
  description: string;
  category: string;
  muscleGroups: string[];
  difficulty: string;
  equipment?: string[];
  sets?: number;
  reps?: number;
}

// Helper to interpolate between two colors
function interpolateColor(
  color1: [number, number, number],
  color2: [number, number, number],
  factor: number
): [number, number, number] {
  return [
    Math.round(color1[0] + (color2[0] - color1[0]) * factor),
    Math.round(color1[1] + (color2[1] - color1[1]) * factor),
    Math.round(color1[2] + (color2[2] - color1[2]) * factor),
  ];
}

export function generateWorkoutPDF(exercises: ExerciseData[], workoutName: string = 'My Workout Plan'): void {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // Colors matching dark mode theme
  const darkGray: [number, number, number] = [17, 24, 39]; // gray-900
  const darkPurple: [number, number, number] = [88, 28, 135]; // purple-900
  const pink: [number, number, number] = [157, 23, 77]; // pink-900
  const primaryColor: [number, number, number] = [147, 51, 234]; // Purple for accents
  const textColor: [number, number, number] = [31, 41, 55];
  const mutedColor: [number, number, number] = [107, 114, 128];

  // Draw gradient header (simulated with vertical strips)
  const headerHeight = 50;
  const strips = 100;
  const stripWidth = pageWidth / strips;

  for (let i = 0; i < strips; i++) {
    const factor = i / strips;
    let color: [number, number, number];

    // Create gradient: darkGray -> darkPurple -> pink -> darkGray
    if (factor < 0.3) {
      // Dark gray to purple
      color = interpolateColor(darkGray, darkPurple, factor / 0.3);
    } else if (factor < 0.6) {
      // Purple to pink
      color = interpolateColor(darkPurple, pink, (factor - 0.3) / 0.3);
    } else {
      // Pink back to dark gray
      color = interpolateColor(pink, darkGray, (factor - 0.6) / 0.4);
    }

    doc.setFillColor(...color);
    doc.rect(i * stripWidth, 0, stripWidth + 0.5, headerHeight, 'F');
  }

  // Header text
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text(workoutName, pageWidth / 2, 25, { align: 'center' });

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(255, 255, 255, 0.8);
  doc.text(`Generated from x-db | ${exercises.length} exercises`, pageWidth / 2, 38, { align: 'center' });

  y = 65;

  // Card styling
  const cardPadding = 12;
  const cardRadius = 6;
  const cardBgColor: [number, number, number] = [249, 250, 251]; // gray-50
  const cardBorderColor: [number, number, number] = [229, 231, 235]; // gray-200
  const numberStripWidth = 32;

  // Exercises
  exercises.forEach((exercise, index) => {
    // Calculate card height based on content
    const descLines = doc.splitTextToSize(exercise.description, contentWidth - numberStripWidth - cardPadding - 40);
    const hasEquipment = exercise.equipment && exercise.equipment.length > 0;
    const cardContentHeight = 14 + 6 + 6 + (hasEquipment ? 6 : 0) + (descLines.length * 5) + 4;
    const cardHeight = cardContentHeight + cardPadding * 2;

    // Check if we need a new page
    if (y + cardHeight > pageHeight - 25) {
      doc.addPage();
      y = margin;
    }

    // Draw card background with rounded corners
    doc.setFillColor(...cardBgColor);
    doc.roundedRect(margin, y, contentWidth, cardHeight, cardRadius, cardRadius, 'F');

    // Draw colored left strip (using clip path simulation with overlapping rectangles)
    doc.setFillColor(...primaryColor);
    // Draw the left strip with rounded corners on the left side
    doc.roundedRect(margin, y, numberStripWidth + cardRadius, cardHeight, cardRadius, cardRadius, 'F');
    // Cover the right rounded corners of the strip with the card background color
    doc.setFillColor(...cardBgColor);
    doc.rect(margin + numberStripWidth, y, cardRadius, cardHeight, 'F');
    // Redraw the purple strip edge
    doc.setFillColor(...primaryColor);
    doc.rect(margin + numberStripWidth - 1, y, 1, cardHeight, 'F');

    // Draw card border
    doc.setDrawColor(...cardBorderColor);
    doc.setLineWidth(0.5);
    doc.roundedRect(margin, y, contentWidth, cardHeight, cardRadius, cardRadius, 'S');

    // Draw exercise number in the left strip
    const stripCenterX = margin + numberStripWidth / 2;
    const stripCenterY = y + cardHeight / 2;
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(String(index + 1), stripCenterX, stripCenterY + 4, { align: 'center' });

    // Content starts after the left strip
    let contentY = y + cardPadding;
    const textX = margin + numberStripWidth + cardPadding;

    // Exercise name
    doc.setTextColor(...textColor);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text(exercise.name, textX, contentY + 4);

    // Sets x Reps badge (on the right side of card)
    const sets = exercise.sets || 3;
    const reps = exercise.reps || 10;
    const setsRepsText = `${sets} x ${reps}`;
    const badgeX = margin + contentWidth - cardPadding - 30;
    const badgeY = contentY - 2;

    // Draw sets/reps badge background
    doc.setFillColor(...primaryColor);
    doc.roundedRect(badgeX, badgeY, 30, 12, 3, 3, 'F');

    // Draw sets/reps text
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(setsRepsText, badgeX + 15, badgeY + 8, { align: 'center' });

    contentY += 14;

    // Category and Difficulty
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...mutedColor);
    doc.text(`${exercise.category} | ${exercise.difficulty}`, textX, contentY);
    contentY += 6;

    // Muscle groups
    doc.setTextColor(...primaryColor);
    doc.text(`Muscles: ${exercise.muscleGroups.join(', ')}`, textX, contentY);
    contentY += 6;

    // Equipment (if any)
    if (hasEquipment) {
      doc.setTextColor(...mutedColor);
      doc.text(`Equipment: ${exercise.equipment!.join(', ')}`, textX, contentY);
      contentY += 6;
    }

    // Description
    doc.setTextColor(...textColor);
    doc.setFontSize(9);
    doc.text(descLines, textX, contentY);

    // Move to next card position
    y += cardHeight + 8;
  });

  // Footer on last page
  doc.setFontSize(8);
  doc.setTextColor(...mutedColor);
  doc.text('Created with x-db - https://jfkeci.github.io/x-db', pageWidth / 2, pageHeight - 10, { align: 'center' });

  // Download
  const filename = workoutName.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.pdf';
  doc.save(filename);
}
