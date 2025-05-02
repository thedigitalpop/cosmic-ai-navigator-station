
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Volume1, VolumeX, SkipBack, SkipForward } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface AudioPlayerProps {
  audioUrl: string;
  title: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Handle play/pause
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Skip forward 15 seconds
  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 15, duration);
    }
  };

  // Skip back 15 seconds
  const skipBack = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 15, 0);
    }
  };

  // Update audio time
  const updateTime = (newTime: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newTime[0];
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Handle volume change
  const handleVolumeChange = (newVolume: number[]) => {
    const volumeValue = newVolume[0];
    setVolume(volumeValue);
    if (audioRef.current) {
      audioRef.current.volume = volumeValue;
      setIsMuted(volumeValue === 0);
    }
  };

  // Format time (seconds -> mm:ss)
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Set up event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      audio.currentTime = 0;
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    // Set initial volume
    audio.volume = volume;

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const VolumeIcon = isMuted ? VolumeX : volume > 0.5 ? Volume2 : Volume1;

  return (
    <div className="bg-secondary-purple/90 backdrop-blur-sm p-4 rounded-xl text-white shadow-lg">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      
      <div className="mb-2 truncate text-sm font-medium">
        {title}
      </div>
      
      <div className="flex items-center space-x-2 mb-2">
        <span className="text-xs w-10 text-center">{formatTime(currentTime)}</span>
        <Slider 
          value={[currentTime]} 
          max={duration} 
          step={0.1} 
          onValueChange={updateTime}
          className="flex-1"
        />
        <span className="text-xs w-10 text-center">{formatTime(duration)}</span>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={skipBack}
            className="text-white hover:text-bright-orange"
            aria-label="Skip backward 15 seconds"
          >
            <SkipBack size={20} />
          </button>
          
          <button 
            onClick={togglePlayPause} 
            className="bg-vivid-purple hover:bg-bright-orange transition-colors rounded-full p-2"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          
          <button 
            onClick={skipForward}
            className="text-white hover:text-bright-orange"
            aria-label="Skip forward 15 seconds"
          >
            <SkipForward size={20} />
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={toggleMute}
            className="text-white hover:text-bright-orange"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            <VolumeIcon size={20} />
          </button>
          <Slider 
            value={[isMuted ? 0 : volume]} 
            max={1} 
            step={0.01} 
            onValueChange={handleVolumeChange}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
