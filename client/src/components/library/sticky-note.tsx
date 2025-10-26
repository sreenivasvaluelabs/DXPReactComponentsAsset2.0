import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { X, Pin, Edit3, Trash2, Grip, Minimize2, Maximize2 } from "lucide-react";

interface StickyNoteProps {
  id?: string;
  content?: string;
  title?: string;
  color?: "yellow" | "pink" | "blue" | "green" | "orange" | "purple";
  size?: "sm" | "md" | "lg";
  position?: { x: number; y: number };
  pinned?: boolean;
  minimized?: boolean;
  editable?: boolean;
  draggable?: boolean;
  onContentChange?: (content: string) => void;
  onTitleChange?: (title: string) => void;
  onDelete?: () => void;
  onPin?: (pinned: boolean) => void;
  onMove?: (position: { x: number; y: number }) => void;
  onMinimize?: (minimized: boolean) => void;
  className?: string;
}

export function LibraryStickyNote({
  id,
  content = "",
  title = "",
  color = "yellow",
  size = "md",
  position = { x: 100, y: 100 },
  pinned = false,
  minimized = false,
  editable = true,
  draggable = true,
  onContentChange,
  onTitleChange,
  onDelete,
  onPin,
  onMove,
  onMinimize,
  className
}: StickyNoteProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentContent, setCurrentContent] = useState(content);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState(position);
  
  const noteRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const colorClasses = {
    yellow: "bg-yellow-200 border-yellow-300 shadow-yellow-200/50",
    pink: "bg-pink-200 border-pink-300 shadow-pink-200/50",
    blue: "bg-blue-200 border-blue-300 shadow-blue-200/50",
    green: "bg-green-200 border-green-300 shadow-green-200/50",
    orange: "bg-orange-200 border-orange-300 shadow-orange-200/50",
    purple: "bg-purple-200 border-purple-300 shadow-purple-200/50"
  };

  const sizeClasses = {
    sm: "w-48 h-48",
    md: "w-64 h-64", 
    lg: "w-80 h-80"
  };

  useEffect(() => {
    setCurrentContent(content);
  }, [content]);

  useEffect(() => {
    setCurrentTitle(title);
  }, [title]);

  useEffect(() => {
    setCurrentPosition(position);
  }, [position]);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(currentContent.length, currentContent.length);
    }
  }, [isEditing, currentContent.length]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!draggable || isEditing) return;
    
    const rect = noteRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !draggable) return;
    
    const newPosition = {
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y
    };
    
    setCurrentPosition(newPosition);
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      onMove?.(currentPosition);
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset, onMove]);

  const handleContentChange = (newContent: string) => {
    setCurrentContent(newContent);
    onContentChange?.(newContent);
  };

  const handleTitleChange = (newTitle: string) => {
    setCurrentTitle(newTitle);
    onTitleChange?.(newTitle);
  };

  const handleSaveContent = () => {
    setIsEditing(false);
    onContentChange?.(currentContent);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
    } else if (e.key === 'Enter' && e.ctrlKey) {
      handleSaveContent();
    }
  };

  if (minimized) {
    return (
      <div
        ref={noteRef}
        className={cn(
          "absolute z-10 cursor-pointer transition-all hover:scale-105",
          colorClasses[color]
        )}
        style={{ left: currentPosition.x, top: currentPosition.y }}
        onClick={() => onMinimize?.(false)}
      >
        <div className="w-12 h-8 rounded border shadow-lg flex items-center justify-center">
          <span className="text-xs font-medium truncate px-1">
            {currentTitle || "Note"}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={noteRef}
      className={cn(
        "absolute z-10 border-2 rounded-lg shadow-lg transition-all transform",
        sizeClasses[size],
        colorClasses[color],
        isDragging && "scale-105 rotate-1",
        pinned && "ring-2 ring-blue-400",
        className
      )}
      style={{ left: currentPosition.x, top: currentPosition.y }}
    >
      {/* Header */}
      <div 
        className={cn(
          "flex items-center justify-between p-2 border-b border-current/20",
          draggable && !isEditing && "cursor-move"
        )}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {draggable && <Grip className="w-4 h-4 text-gray-600 opacity-50" />}
          
          {editable ? (
            <input
              type="text"
              value={currentTitle}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Note title..."
              className="bg-transparent border-none outline-none text-sm font-semibold flex-1 min-w-0 placeholder-gray-500"
              onMouseDown={(e) => e.stopPropagation()}
            />
          ) : (
            <h3 className="text-sm font-semibold truncate flex-1">
              {currentTitle || "Sticky Note"}
            </h3>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onMinimize?.(!minimized)}
            className="p-1 hover:bg-white/30 rounded"
            title="Minimize"
          >
            <Minimize2 className="w-3 h-3" />
          </button>
          
          <button
            onClick={() => onPin?.(!pinned)}
            className={cn(
              "p-1 hover:bg-white/30 rounded",
              pinned && "text-blue-600"
            )}
            title={pinned ? "Unpin" : "Pin"}
          >
            <Pin className="w-3 h-3" />
          </button>
          
          {editable && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={cn(
                "p-1 hover:bg-white/30 rounded",
                isEditing && "text-blue-600"
              )}
              title={isEditing ? "Stop editing" : "Edit"}
            >
              <Edit3 className="w-3 h-3" />
            </button>
          )}
          
          <button
            onClick={onDelete}
            className="p-1 hover:bg-white/30 rounded text-red-600"
            title="Delete"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 flex-1 h-full overflow-hidden">
        {isEditing ? (
          <textarea
            ref={textareaRef}
            value={currentContent}
            onChange={(e) => handleContentChange(e.target.value)}
            onBlur={handleSaveContent}
            onKeyDown={handleKeyDown}
            placeholder="Write your note here... (Ctrl+Enter to save, Esc to cancel)"
            className="w-full h-full bg-transparent border-none outline-none resize-none text-sm placeholder-gray-500"
          />
        ) : (
          <div 
            className="w-full h-full text-sm whitespace-pre-wrap break-words overflow-y-auto cursor-text"
            onClick={() => editable && setIsEditing(true)}
          >
            {currentContent || (
              <span className="text-gray-500">
                {editable ? "Click to add content..." : "Empty note"}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Sticky Notes Board Component
export function StickyNotesBoard({ 
  notes, 
  onNotesChange, 
  className 
}: {
  notes: Array<{
    id: string;
    content: string;
    title: string;
    color: "yellow" | "pink" | "blue" | "green" | "orange" | "purple";
    position: { x: number; y: number };
    pinned: boolean;
    minimized: boolean;
  }>;
  onNotesChange: (notes: any[]) => void;
  className?: string;
}) {
  const addNote = () => {
    const newNote = {
      id: Math.random().toString(36).substr(2, 9),
      content: "",
      title: "New Note",
      color: "yellow" as const,
      position: { 
        x: Math.random() * 300 + 50, 
        y: Math.random() * 200 + 50 
      },
      pinned: false,
      minimized: false
    };
    
    onNotesChange([...notes, newNote]);
  };

  const updateNote = (id: string, updates: Partial<typeof notes[0]>) => {
    onNotesChange(
      notes.map(note => 
        note.id === id ? { ...note, ...updates } : note
      )
    );
  };

  const deleteNote = (id: string) => {
    onNotesChange(notes.filter(note => note.id !== id));
  };

  return (
    <div className={cn("relative w-full h-96 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg", className)}>
      {/* Add Note Button */}
      <button
        onClick={addNote}
        className="absolute top-4 left-4 z-20 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
      >
        + Add Note
      </button>

      {/* Notes */}
      {notes.map((note) => (
        <LibraryStickyNote
          key={note.id}
          {...note}
          onContentChange={(content) => updateNote(note.id, { content })}
          onTitleChange={(title) => updateNote(note.id, { title })}
          onMove={(position) => updateNote(note.id, { position })}
          onPin={(pinned) => updateNote(note.id, { pinned })}
          onMinimize={(minimized) => updateNote(note.id, { minimized })}
          onDelete={() => deleteNote(note.id)}
        />
      ))}

      {notes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          <div className="text-center">
            <p className="text-lg font-medium mb-2">No sticky notes yet</p>
            <p className="text-sm">Click "Add Note" to create your first note</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Quick Note Component
export function QuickNote({ 
  onSave, 
  color = "yellow", 
  className 
}: {
  onSave: (content: string, title: string) => void;
  color?: "yellow" | "pink" | "blue" | "green" | "orange" | "purple";
  className?: string;
}) {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const handleSave = () => {
    if (content.trim() || title.trim()) {
      onSave(content, title || "Quick Note");
      setContent("");
      setTitle("");
    }
  };

  return (
    <div className={cn("w-64", className)}>
      <LibraryStickyNote
        content={content}
        title={title}
        color={color}
        size="sm"
        position={{ x: 0, y: 0 }}
        draggable={false}
        onContentChange={setContent}
        onTitleChange={setTitle}
        className="relative"
      />
      
      <button
        onClick={handleSave}
        disabled={!content.trim() && !title.trim()}
        className="mt-2 w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
      >
        Save Note
      </button>
    </div>
  );
}